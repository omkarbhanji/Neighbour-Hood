import api from "./api";

export const voteIssue = async(issueId, voteType) => {

    const result = await api.post('/vote/vote-on-issue', {issueId, voteType});
    return result.data;
}