import api from "./api";

const API_URL = "/api/v1/financial";

const getAllFinancial = () => {
  return api.get(API_URL);
};

const getByFinancialId = (id) => {
  return api.get(`${API_URL}/${id}`);
};

const addFinancial = (financial) => {
  return api.post(`${API_URL}`, financial);
};
const updateFinancial = (id, financial) => {
  return api.put(`${API_URL}/edit/${id}`, financial);
};
const FinancialService = {
  getAllFinancial,
  getByFinancialId,
  addFinancial,
  updateFinancial,
};

export default FinancialService;
