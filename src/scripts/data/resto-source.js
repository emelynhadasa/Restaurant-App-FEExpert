import API_ENDPOINT from '../globals/api-endpoint';

class RestoSource {
  static async homePage() {
    const response = await fetch(API_ENDPOINT.homepage);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.detailresto(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async postReview(data) {
    const response = await fetch(API_ENDPOINT.review, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default RestoSource;
