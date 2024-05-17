import axios from "axios";
import { getContentType} from "@/app/api/api.helper";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	headers: getContentType(),
	withCredentials: true,
})


export default instance;