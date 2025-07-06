import db from '../models/db.js'

export const checkEmail = async (email: string) => {

    try {
        const q = "select email from users where email = ?"
        const [rows] = await db.execute(q, [email])
        return rows
    }
    catch (err) {
        return err
    }
}