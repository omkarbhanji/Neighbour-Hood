import api from './api'

export const getAllAreas = async (req, res) => {
    const result = await api.get('/area/get-all-areas');
    return result;
}