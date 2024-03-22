export const deleteUserFromTeam = async (
  useremail: string,
  teamsIds: string
) => {
  let batchQueriesInfo = await getUsersMemberIDs(
    teamsIds,
    useremail
  );
  // DELETE /teams/{team-id}/members/{membership-id}
  let deleteMembershipBatch: Array<Object> = [];
  for (let i = 0; i < batchQueriesInfo.length; i++) {
    deleteMembershipBatch.push({
      id: batchQueriesInfo[i].teamId,
      method: "DELETE",
      url: `/teams/${batchQueriesInfo[i].teamId}/members/${batchQueriesInfo[i].membershipID}`,
    });
  }
  const batcContent = `{"requests":${JSON.stringify(deleteMembershipBatch)}}`;

  const batchRequestToDeleteUser = await fetch(
    "https://graph.microsoft.com/v1.0/$batch",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: batcContent,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return batchRequestToDeleteUser;
};
