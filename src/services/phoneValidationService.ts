import axios from "axios";

const API_BASE_URL = "https://apilayer.net/api/validate";
const ACCESS_KEY = "77088edd232dd49ee3aaabdca98358ef";

export const validatePhoneNumber = async (
  phoneNumber: string
): Promise<any> => {
  try {
    // Montar a URL com os parâmetros
    const url = `${API_BASE_URL}?number=${phoneNumber}&access_key=${ACCESS_KEY}`;

    // Fazer a requisição GET
    const response = await axios.get(url);

    // Retornar os dados da resposta
    return response.data;
  } catch (error) {
    console.error("Erro ao validar o número de telefone:", error);
    throw new Error("Não foi possível validar o número de telefone.");
  }
};
