//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError } from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from "axios";

export interface ICharacterStatsClient {
  get(
    characterName: string | null | undefined,
    realm: string | null | undefined,
    clientId: string | null | undefined
  ): Promise<StatDto>;
}

export class CharacterStatsClient implements ICharacterStatsClient {
  private instance: AxiosInstance;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(baseUrl?: string, instance?: AxiosInstance) {
    this.instance = instance ? instance : axios.create();

    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : "https://wowstatcardsapi.azurewebsites.net";
  }

  get(
    characterName: string | null | undefined,
    realm: string | null | undefined,
    clientId: string | null | undefined,
    cancelToken?: CancelToken | undefined
  ): Promise<StatDto> {
    let url_ = this.baseUrl + "/api/CharacterStats?";
    if (characterName !== undefined && characterName !== null)
      url_ += "characterName=" + encodeURIComponent("" + characterName) + "&";
    if (realm !== undefined && realm !== null)
      url_ += "realm=" + encodeURIComponent("" + realm) + "&";
    if (clientId !== undefined && clientId !== null)
      url_ += "clientId=" + encodeURIComponent("" + clientId) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGet(_response);
      });
  }

  protected processGet(response: AxiosResponse): Promise<StatDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = StatDto.fromJS(resultData200);
      return Promise.resolve<StatDto>(result200);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<StatDto>(null as any);
  }
}

export interface IStatCardsClient {
  getAll(): Promise<StatCardDto[]>;
  post(statCardDto: StatCardDto): Promise<StatCardDto>;
  get(id: number): Promise<StatCardDto>;
  put(id: number, statCardDto: StatCardDto): Promise<StatCardDto>;
  delete(id: number): Promise<void>;
}

export class StatCardsClient implements IStatCardsClient {
  private instance: AxiosInstance;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(baseUrl?: string, instance?: AxiosInstance) {
    this.instance = instance ? instance : axios.create();

    this.baseUrl =
      baseUrl !== undefined && baseUrl !== null
        ? baseUrl
        : "https://wowstatcardsapi.azurewebsites.net";
  }

  getAll(cancelToken?: CancelToken | undefined): Promise<StatCardDto[]> {
    let url_ = this.baseUrl + "/api/StatCards";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGetAll(_response);
      });
  }

  protected processGetAll(response: AxiosResponse): Promise<StatCardDto[]> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      if (Array.isArray(resultData200)) {
        result200 = [] as any;
        for (let item of resultData200)
          result200!.push(StatCardDto.fromJS(item));
      } else {
        result200 = <any>null;
      }
      return Promise.resolve<StatCardDto[]>(result200);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<StatCardDto[]>(null as any);
  }

  post(
    statCardDto: StatCardDto,
    cancelToken?: CancelToken | undefined
  ): Promise<StatCardDto> {
    let url_ = this.baseUrl + "/api/StatCards";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(statCardDto);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: "POST",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processPost(_response);
      });
  }

  protected processPost(response: AxiosResponse): Promise<StatCardDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = StatCardDto.fromJS(resultData200);
      return Promise.resolve<StatCardDto>(result200);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<StatCardDto>(null as any);
  }

  get(id: number, cancelToken?: CancelToken | undefined): Promise<StatCardDto> {
    let url_ = this.baseUrl + "/api/StatCards/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processGet(_response);
      });
  }

  protected processGet(response: AxiosResponse): Promise<StatCardDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = StatCardDto.fromJS(resultData200);
      return Promise.resolve<StatCardDto>(result200);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<StatCardDto>(null as any);
  }

  put(
    id: number,
    statCardDto: StatCardDto,
    cancelToken?: CancelToken | undefined
  ): Promise<StatCardDto> {
    let url_ = this.baseUrl + "/api/StatCards/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(statCardDto);

    let options_: AxiosRequestConfig = {
      data: content_,
      method: "PUT",
      url: url_,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processPut(_response);
      });
  }

  protected processPut(response: AxiosResponse): Promise<StatCardDto> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      let result200: any = null;
      let resultData200 = _responseText;
      result200 = StatCardDto.fromJS(resultData200);
      return Promise.resolve<StatCardDto>(result200);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<StatCardDto>(null as any);
  }

  delete(id: number, cancelToken?: CancelToken | undefined): Promise<void> {
    let url_ = this.baseUrl + "/api/StatCards/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "DELETE",
      url: url_,
      headers: {},
      cancelToken,
    };

    return this.instance
      .request(options_)
      .catch((_error: any) => {
        if (isAxiosError(_error) && _error.response) {
          return _error.response;
        } else {
          throw _error;
        }
      })
      .then((_response: AxiosResponse) => {
        return this.processDelete(_response);
      });
  }

  protected processDelete(response: AxiosResponse): Promise<void> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && typeof response.headers === "object") {
      for (let k in response.headers) {
        if (response.headers.hasOwnProperty(k)) {
          _headers[k] = response.headers[k];
        }
      }
    }
    if (status === 200) {
      const _responseText = response.data;
      return Promise.resolve<void>(null as any);
    } else if (status !== 200 && status !== 204) {
      const _responseText = response.data;
      return throwException(
        "An unexpected server error occurred.",
        status,
        _responseText,
        _headers
      );
    }
    return Promise.resolve<void>(null as any);
  }
}

export class CharacterStats implements ICharacterStats {
  characterName!: string;
  avatarUrl?: string | undefined;
  renderUrl?: string | undefined;
  health?: number | undefined;
  strength?: number | undefined;
  agility?: number | undefined;
  intellect?: number | undefined;
  stamina?: number | undefined;
  meleeCrit?: number | undefined;
  meleeHaste?: number | undefined;
  mastery?: number | undefined;
  bonusArmor?: number | undefined;
  lifesteal?: number | undefined;
  versatility?: number | undefined;
  attackPower?: number | undefined;
  mainHandDamageMin?: number | undefined;
  mainHandDamageMax?: number | undefined;
  mainHandSpeed?: number | undefined;
  mainHandDps?: number | undefined;
  offHandDamageMin?: number | undefined;
  offHandDamageMax?: number | undefined;
  offHandSpeed?: number | undefined;
  offHandDps?: number | undefined;
  spellPower?: number | undefined;
  spellCrit?: number | undefined;
  armor?: number | undefined;

  constructor(data?: ICharacterStats) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.characterName = _data["characterName"];
      this.avatarUrl = _data["avatarUrl"];
      this.renderUrl = _data["renderUrl"];
      this.health = _data["health"];
      this.strength = _data["strength"];
      this.agility = _data["agility"];
      this.intellect = _data["intellect"];
      this.stamina = _data["stamina"];
      this.meleeCrit = _data["meleeCrit"];
      this.meleeHaste = _data["meleeHaste"];
      this.mastery = _data["mastery"];
      this.bonusArmor = _data["bonusArmor"];
      this.lifesteal = _data["lifesteal"];
      this.versatility = _data["versatility"];
      this.attackPower = _data["attackPower"];
      this.mainHandDamageMin = _data["mainHandDamageMin"];
      this.mainHandDamageMax = _data["mainHandDamageMax"];
      this.mainHandSpeed = _data["mainHandSpeed"];
      this.mainHandDps = _data["mainHandDps"];
      this.offHandDamageMin = _data["offHandDamageMin"];
      this.offHandDamageMax = _data["offHandDamageMax"];
      this.offHandSpeed = _data["offHandSpeed"];
      this.offHandDps = _data["offHandDps"];
      this.spellPower = _data["spellPower"];
      this.spellCrit = _data["spellCrit"];
      this.armor = _data["armor"];
    }
  }

  static fromJS(data: any): CharacterStats {
    data = typeof data === "object" ? data : {};
    let result = new CharacterStats();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["characterName"] = this.characterName;
    data["avatarUrl"] = this.avatarUrl;
    data["renderUrl"] = this.renderUrl;
    data["health"] = this.health;
    data["strength"] = this.strength;
    data["agility"] = this.agility;
    data["intellect"] = this.intellect;
    data["stamina"] = this.stamina;
    data["meleeCrit"] = this.meleeCrit;
    data["meleeHaste"] = this.meleeHaste;
    data["mastery"] = this.mastery;
    data["bonusArmor"] = this.bonusArmor;
    data["lifesteal"] = this.lifesteal;
    data["versatility"] = this.versatility;
    data["attackPower"] = this.attackPower;
    data["mainHandDamageMin"] = this.mainHandDamageMin;
    data["mainHandDamageMax"] = this.mainHandDamageMax;
    data["mainHandSpeed"] = this.mainHandSpeed;
    data["mainHandDps"] = this.mainHandDps;
    data["offHandDamageMin"] = this.offHandDamageMin;
    data["offHandDamageMax"] = this.offHandDamageMax;
    data["offHandSpeed"] = this.offHandSpeed;
    data["offHandDps"] = this.offHandDps;
    data["spellPower"] = this.spellPower;
    data["spellCrit"] = this.spellCrit;
    data["armor"] = this.armor;
    return data;
  }
}

export interface ICharacterStats {
  characterName: string;
  avatarUrl?: string | undefined;
  renderUrl?: string | undefined;
  health?: number | undefined;
  strength?: number | undefined;
  agility?: number | undefined;
  intellect?: number | undefined;
  stamina?: number | undefined;
  meleeCrit?: number | undefined;
  meleeHaste?: number | undefined;
  mastery?: number | undefined;
  bonusArmor?: number | undefined;
  lifesteal?: number | undefined;
  versatility?: number | undefined;
  attackPower?: number | undefined;
  mainHandDamageMin?: number | undefined;
  mainHandDamageMax?: number | undefined;
  mainHandSpeed?: number | undefined;
  mainHandDps?: number | undefined;
  offHandDamageMin?: number | undefined;
  offHandDamageMax?: number | undefined;
  offHandSpeed?: number | undefined;
  offHandDps?: number | undefined;
  spellPower?: number | undefined;
  spellCrit?: number | undefined;
  armor?: number | undefined;
}

export class StatDto extends CharacterStats implements IStatDto {
  characterName!: string;
  avatarUrl!: string;
  renderUrl!: string;

  constructor(data?: IStatDto) {
    super(data);
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.characterName = _data["characterName"];
      this.avatarUrl = _data["avatarUrl"];
      this.renderUrl = _data["renderUrl"];
    }
  }

  static override fromJS(data: any): StatDto {
    data = typeof data === "object" ? data : {};
    let result = new StatDto();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["characterName"] = this.characterName;
    data["avatarUrl"] = this.avatarUrl;
    data["renderUrl"] = this.renderUrl;
    super.toJSON(data);
    return data;
  }
}

export interface IStatDto extends ICharacterStats {
  characterName: string;
  avatarUrl: string;
  renderUrl: string;
}

export class StatCardDto extends CharacterStats implements IStatCardDto {
  id?: number | undefined;
  cardName!: string;
  characterName!: string;
  avatarUrl!: string;
  renderUrl!: string;
  factionId!: FactionEnum;

  constructor(data?: IStatCardDto) {
    super(data);
  }

  override init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.id = _data["id"];
      this.cardName = _data["cardName"];
      this.characterName = _data["characterName"];
      this.avatarUrl = _data["avatarUrl"];
      this.renderUrl = _data["renderUrl"];
      this.factionId = _data["factionId"];
    }
  }

  static override fromJS(data: any): StatCardDto {
    data = typeof data === "object" ? data : {};
    let result = new StatCardDto();
    result.init(data);
    return result;
  }

  override toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["cardName"] = this.cardName;
    data["characterName"] = this.characterName;
    data["avatarUrl"] = this.avatarUrl;
    data["renderUrl"] = this.renderUrl;
    data["factionId"] = this.factionId;
    super.toJSON(data);
    return data;
  }
}

export interface IStatCardDto extends ICharacterStats {
  id?: number | undefined;
  cardName: string;
  characterName: string;
  avatarUrl: string;
  renderUrl: string;
  factionId: FactionEnum;
}

export enum FactionEnum {
  Alliance = 1,
  Horde = 2,
}

export class ApiException extends Error {
  override message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  if (result !== null && result !== undefined) throw result;
  else throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
  return obj && obj.isAxiosError === true;
}
