import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getToken } from "../common/msalHelper";

const getAuthToken: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const token = getToken();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: token
    };

};

export default getAuthToken;