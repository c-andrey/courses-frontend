export const httpClient = {
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                this.handleError(response);
            }
            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    },

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                this.handleError(response);
            }
            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    },

    async put(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                this.handleError(response);
            }
            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    },

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (!response.ok) {
                this.handleError(response);
            }
            return response.ok;
        } catch (error) {
            this.handleError(error);
        }
    },

    handleError(error) {
        console.error(error);

        if (error instanceof Error) {
            console.error('Network or unexpected error:', error.message);
            throw new Error('An unexpected error occurred. Please try again.');
        }

        if (error instanceof Response) {
            switch (error.status) {
                case 400:
                    throw new Error('Bad Request: Invalid data sent.');
                case 401:
                    throw new Error(
                        'Unauthorized: Please check your credentials.'
                    );
                case 404:
                    throw new Error(
                        'Not Found: The requested resource does not exist.'
                    );
                case 500:
                    throw new Error(
                        'Server Error: Something went wrong on the server.'
                    );
                default:
                    throw new Error(
                        `HTTP Error: ${error.status} - ${error.statusText}`
                    );
            }
        }

        throw new Error('An unknown error occurred.');
    },
};
