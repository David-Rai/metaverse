import db from '../models/db.js'

async function checkSpace(space_id: string) {
    //Checking if the space exist or not
    const check_query = 'select * from spaces where space_id = ?'
    const [check_query_result]: any[] = await db.execute(check_query, [space_id])

   
    if (check_query_result.length > 0) {
        return true
    }

    return false
}

export default checkSpace