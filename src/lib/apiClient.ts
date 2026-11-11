import { ofetch } from "ofetch";

const BaseURL = process.env.NEXT_PUBLIC_API_URL

const apiClient = ofetch.create({
  baseURL: BaseURL,
  credentials: "include",
});

export default apiClient;
