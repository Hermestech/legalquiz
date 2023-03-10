export class ApiService {
  static async get(url: string) {
    const response = await fetch(url);
    return response.json();
  }
    static async post(url: string, data: any) { 
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
        return response.json();
    }
  static async put(url: string, data: any) { 
    try {
          const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
    } catch (error: any) {
      return error.message;
    }
  }
}

export class ApiScore {
  static async getScore() { 
    return await ApiService.get(process.env.API_BASE_URL + 'score');
  }
}