

const BASE_URL = 'http://localhost:3000/api/v1';


 class ServiceApi {


    async getAllServices(){
        const response = await fetch(`${BASE_URL}/services`);
        if (!response.ok) {
            throw new Error(`Error fetching services: ${response.statusText}`);
        }
        return await response.json();
    }

     async addService(service) {
        const response = await fetch(`${BASE_URL}/service`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(service)
        });
        if (!response.ok) {
            throw new Error(`Error adding service: ${response.statusText}`);
        }
        return await response.json();
    }

     async deleteService(service) {
        console.log("Deleting service:", service);
        const response = await fetch(`${BASE_URL}/service`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(service)
        });
        if (!response.ok) {
            throw new Error(`Error deleting service: ${response.statusText}`);
        } 
        return response
    }


}

export default new ServiceApi();