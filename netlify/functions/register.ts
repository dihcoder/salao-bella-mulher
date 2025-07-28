import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
    process.env['SUPABASE_URL'] || 'SUPABASE_URL',
    process.env['SUPABASE_ANON_KEY'] || 'SUPABASE_ANON_KEY'
);

export const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { fullName, email, password } = JSON.parse(event.body || "{}");

    if (!fullName || !email || !password) {
        return { statusCode: 400, body: "Campos obrigatórios ausentes." };
    }

    // 1. Verificar se já existe
    const { data: existing } = await supabase
        .from("system_config")
        .select("value")
        .eq("key", 'admin_user_data')
        .maybeSingle();

    if (existing) {
        return { statusCode: 409, body: "Admin já cadastrado." };
    }

    // 2. Validar senha
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
    if (!strong) {
        return { statusCode: 400, body: "Senha fraca." };
    }

    // 3. Gerar hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 4. Inserir usuário
    const { error } = await supabase.from("users").insert({
        fullName,
        email: email.toLowerCase(),
        password_hash: hash,
        password_salt: salt,
        is_active: true,
        role_id: 3, // student (assumindo que esse é o ID de estudante)
    });

    if (error) {
        return { statusCode: 500, body: "Erro ao cadastrar usuário." };
    }

    return {
        statusCode: 201,
        body: JSON.stringify({ message: "Usuário registrado com sucesso." }),
    };
};
