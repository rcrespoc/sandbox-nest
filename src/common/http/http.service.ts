import { Injectable } from "@nestjs/common";
import { HttpMethod } from "../enum/http-methods.enum";
import { HttpHeaders } from "../enum/http-headers.enum";

@Injectable()
export class HttpService {
  constructor() {}

  async fetch(
    method: HttpMethod,
    url: string,
    body?: any,
  ): Promise<any> {
    let response: Response;
    if (method === HttpMethod.GET) {
      response = await fetch(url, {
        method,
        headers: {
          [HttpHeaders.CONTENT_TYPE]: HttpHeaders.APPLICATION_JSON,
        },
      });
    } else {
      response = await fetch(url, {
        method,
        headers: {
          [HttpHeaders.CONTENT_TYPE]: HttpHeaders.APPLICATION_JSON,
        },
        body: JSON.stringify(body),
      });
    }
    
    const data = response.headers.get(HttpHeaders.CONTENT_TYPE) === HttpHeaders.APPLICATION_JSON
      ? await response.json()
      : await response;

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  }
}
