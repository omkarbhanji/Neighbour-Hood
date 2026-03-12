import api from './api'

export const getFilteredData = async (areaId, category) => {
    const result = await api.get('/issue/get-filtered-issues',{
        params: {
      areaId: areaId,
      category: category
    }
    });
    console.log(result.data);
    return result.data;
}

export const updateIssueStatus = async (issueId, updatedStatus) => {
    const result = await api.patch('/issue/update-issue-status', {issueId, updatedStatus});
    return result.data;
}