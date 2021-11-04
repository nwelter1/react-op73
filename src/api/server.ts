const token = '72f1cc607dbe687feee1b93911602467dbc134b63e5201d0';


export const server_calls = {
    get: async () => {
        const response = await fetch('https://operators-drones.herokuapp.com/api/drones',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Failed to fetch your data from the server...')
        }
        return await response.json()
    },
    create: async (data: any = {}) =>{
        const response = await fetch('https://operators-drones.herokuapp.com/api/drones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Failed to create your drone...')
        }
        console.log('response from api', response)
        return await response.json()
    },
    update: async (id:string, data: any = {}) => {
        const response = await fetch(`https://operators-drones.herokuapp.com/api/drones/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok){
            throw new Error('Failed to update your drone...')
        }
        console.log(`Updated drone ${id} with ${data}`)
        return await response.json()
    },
    delete: async(id:string) =>{
        const response = await fetch(`https://operators-drones.herokuapp.com/api/drones/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if (!response.ok){
            throw new Error('Could not delete your drone...')
        }
    }
}