const getUserTeams = async (userEmail: string) => {
    const currentUserTeams = await fetch(`https://graph.microsoft.com/v1.0/users/${userEmail}/teamwork/associatedTeams`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.value) {
            return data.value,
        } else {
          return data
        }
      })
      .catch((error) => {
        return error
      });
    return currentUserTeams;
  }

  const getUsersMemberIDs = async (
    useremail: string,
    teamids: string,
  ): Promise<any> => {
    let allMembershipIDs: Array<Object> = [];
    // const getUserMemberidURL = `https://graph.microsoft.com/v1.0//teams/${teamid}/members`;
    const teamidarray = teamids.split(",");
  
    if (teamidarray.length > 20) {
      // must be handled in more batches
    } else {
      for (let i = 0; i < teamidarray.length; i++) {
        if (teamidarray[i].length === 36) { //checking for valid ID - must be 36 characters
          allMembershipIDs.push({
            id: teamidarray[i],
            method: "GET",
            url: `/teams/${teamidarray[i]}/members`,
          });
        }
      }
    }
    const batcContent = `{"requests":${JSON.stringify(allMembershipIDs)}}`;

    const batchRequestToGetMembershipIDs = await fetch(
        "https://graph.microsoft.com/v1.0/$batch",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: batcContent,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const results = data.responses;
          let tmp: Array<Object> = [];
          if (results && results.length) {
            for (let i = 0; i < results.length; i++) {
              const usermemberid = results[i].body.value.filter(
                (user) => (user.email as string).toLowerCase() === useremail.toLowerCase()
              );
              const tmpObj = {
                teamId: results[i].id,
                membershipID: usermemberid[0].id,
                useremail: useremail,
              };
              tmp.push(tmpObj);
            }
          }
          return tmp;
        }).catch((error) => {
          return error;
        });
    
      return batchRequestToGetMembershipIDs;
    };