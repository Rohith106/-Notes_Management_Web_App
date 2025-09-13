// MySQL Note model: basic query functions
import mysql from "mysql2/promise";

// MySQL connection function
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log("MySQL Connected Successfully");
        return connection;
    } catch (error) {
        console.error("Error connecting to MySQL", error);
        process.exit(1);
    }
};

export async function getAllNotes() {
    const conn = await connectDB();
    const [rows] = await conn.execute("SELECT * FROM notes ORDER BY createdAt DESC");
    return rows;
}

export async function getNoteById(id) {
    const conn = await connectDB();
    const [rows] = await conn.execute("SELECT * FROM notes WHERE id = ?", [id]);
    return rows[0];
}

export async function createNote(title, content) {
    const conn = await connectDB();
    const [result] = await conn.execute(
        "INSERT INTO notes (title, content, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
        [title, content]
    );
    return { id: result.insertId, title, content };
}

export async function updateNote(id, title, content) {
    const conn = await connectDB();
    await conn.execute(
        "UPDATE notes SET title = ?, content = ?, updatedAt = NOW() WHERE id = ?",
        [title, content, id]
    );
    return await getNoteById(id);
}

export async function deleteNote(id) {
    const conn = await connectDB();
    const [result] = await conn.execute("DELETE FROM notes WHERE id = ?", [id]);
    return result.affectedRows > 0;
}
