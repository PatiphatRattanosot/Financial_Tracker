import api from "./api";

const API_URL = import.meta.env.VITE_API_URL_FINANCIAL;

const getAllFinancial = () => {
  return api.get(API_URL);
};
const getAllFinancialByUserId = (userId) => {
  return api.get(`${API_URL}/user/${userId}`);
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

const deleteFinancial = (id) => {
  return api.delete(`${API_URL}/delete/${id}`);
};
const FinancialService = {
  getAllFinancial,
  getAllFinancialByUserId,
  getByFinancialId,
  addFinancial,
  updateFinancial,
  deleteFinancial,
};

export default FinancialService;
