const baseApi = "https://api.spacebooks.com.br";
//const baseApi = "https://developer.hmdev.com.br";
const spaceBookBaseApi = "https://spacebooks.com.br/apiSpacebooks/content"

const regras = {
    admin: 'admin',
    parceiro: 'parceiro',
    cliente: 'cliente',
    vendedor: 'vendedor',
}  


export default {

    baseApi,

    spaceBookBaseApi,

    regras,

    GetProfiles: async (type) => {
        try {
            const rawResponse = await fetch(`${baseApi}/auth/users/role/${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            });

            const content = await rawResponse.json(); 
            
            return content;

        } catch (error) {
            throw new Error(error);
        }
    },

    

    getDataInfo: async (category) => {
        const req = await fetch(`${baseApi}/${category}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const json = await req.json();
        
        return json;
    },
    
    getDataInfoById: async (category, id) => {
        const req = await fetch(`${baseApi}/${category}/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const json = await req.json();
        
        return json;
    },

    putActivateUser: async (id) => {
        const req = await fetch(`${baseApi}/auth/${id}/approve`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })

        const json = await req.json();
        
        return json;
    },

    putCanceledUser: async (id) => {
        const req = await fetch(`${baseApi}/auth/${id}/reprovar`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })

        const json = await req.json();
        
        return json;
    },

    getStatusUserById: async (id) => {
        const req = await fetch(`${baseApi}/auth/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })

        const json = await req.json();
        
        return json;
    },

    getStatusUser: async (status) => {
        const req = await fetch(`${baseApi}/auth/users/status-venda/${status}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })

        const json = await req.json();
        
        return json;
    },

    getStatusUserAtivoInativo: async (status) => {
        const req = await fetch(`${baseApi}/auth/users/status-venda/${status}/created-last-two-months`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })

        const json = await req.json();
        
        return json;
    },


}