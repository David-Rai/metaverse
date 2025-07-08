var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from '../models/db.js';
function checkSpace(space_id) {
    return __awaiter(this, void 0, void 0, function* () {
        //Checking if the space exist or not
        const check_query = 'select * from spaces where space_id = ?';
        const [check_query_result] = yield db.execute(check_query, [space_id]);
        if (check_query_result.length > 0) {
            return true;
        }
        return false;
    });
}
export default checkSpace;
