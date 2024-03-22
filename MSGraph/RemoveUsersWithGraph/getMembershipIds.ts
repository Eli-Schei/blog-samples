const getUserMembershipIDs = async (
  teamIDs: Array<string>,
  userEmail: string
) => {
  // Create empty list to keep the objects needed for the batch request
  let allUserMembershipIDRequests: Array<Object> = [];

  if (teamidarray.length > 20) {
    //! If your user interface does not have a limit on how many teamsIDs is sent in, you need to add
    //! handling of that here
  } else {
    for (let i = 0; i < teamIDs.length; i++) {
        //checking for valid ID - must be 36 characters
      if (teamIDs[i].length === 36) {
        allUserMembershipIDRequests.push({
          id: teamIDs[i],
          method: "GET",
          url: `/teams/${teamIDs[i]}/members`,
        });
      }
    }
  }

  // Create string for the entire batch
  const batcContent = `{"requests":${JSON.stringify(allUserMembershipIDRequests)}}`;

 // Doing the POST request to the batch endpoint 
  const secondBatchRequestIbject = await fetch(
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
      // You get multiple responses back and need to filter out the membershipID for the user you are removing  
      const results = data.responses;
      // Array to contain the information needed to do the next request
      let tmp: Array<Object> = [];
      //checking if the response is not empty
      if (results && results.length) {
        // loopint through results and filtering the members of each team to find the unique memberID of the user
        for (let i = 0; i < results.length; i++) {
          const usermemberid = results[i].body.value.filter(
            (user) => (user.email as string).toLowerCase() === userEmail.toLowerCase()
          );

          // Creating a temporary object with the information needed for next request
          const tmpObj = {
            teamId: results[i].id,
            membershipID: usermemberid[0].id,
            useremail: userEmail,
          }
          //Adding obj to array
          tmp.push(tmpObj);
        }
      }
      return tmp;
    }).catch((error) => {
      return error;
    });
};
