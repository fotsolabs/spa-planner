import ApiUtils from "./ApiUtils";

class EmployeeApi {
    
    async getAllEmployees(){
        const response = await fetch(`${ApiUtils.baseUrl}/employees`);
        if (!response.ok) {
            throw new Error(`Error fetching services: ${response.statusText}`);
        }
        return await response.json();
    }

    

    async addEmployee(employee) {
        const response = await fetch(`${ApiUtils.baseUrl}/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        if (!response.ok) {
            throw new Error(`Error adding employee: ${response.statusText}`);
        }
        return await response.json();
    }
    async deleteEmployee(employee) {
        console.log("Deleting employee:", employee);
        const response = await fetch(`${ApiUtils.baseUrl}/employee`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        if (!response.ok) {
            throw new Error(`Error deleting employee: ${response.statusText}`);
        } 
        return response;
    }
    
}
export default new EmployeeApi();