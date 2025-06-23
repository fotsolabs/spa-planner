import ApiUtils from "./ApiUtils";

class EmployeeApi {
    
    async getAllEmployees(){
        const response = await fetch(`${ApiUtils.baseUrl}/employees`);
        if (!response.ok) {
            throw new Error(`Error fetching services: ${response.statusText}`);
        }
        return await response.json();
    }
    
}
export default new EmployeeApi();