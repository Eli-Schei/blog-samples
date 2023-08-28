const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const tenantID = "<your tenant id>";
const appID = "<your app id>";
const appSecret = "your app secret"; //A best practice would be to put the secret in a key vault and not directly in the code
const authURL =
  "https://login.microsoftonline.com/" + tenantID + "/oauth2/v2.0/token";


export const getToken = async (context?: any): Promise<string> => {
  let params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", appID);
  params.append("client_secret", appSecret); 
  params.append("scope", "https://graph.microsoft.com/.default");

  const token = await fetch(authURL, {
    method: "GET",
    headers: {},
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      return data.access_token;
    });

  //for debugging - if the context is passed in as a parameter it will log what is returned from the auth endpoint - hopefully your token
  if (context) {
    context.log(token);
  }
  return token;
};
