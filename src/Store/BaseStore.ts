import { Dispatcher }      from "../Core/Dispatcher"      ;
import { EventBusAutoOff } from "../Utils/Event/EventBus" ;
import { Guid } from "../Utils/Text/Guid";
import { sFDebugger } from "./Debugger";

export type TBaseStore<T> = {
  id         ?: string                                                         ;
  nextState   : (newState: Partial<T>, mergeToPreviousState?: boolean) => void ;
  sendAction  : <U>(type: string, payload: U) => void                          ;
}

export class BaseStore<T> {
  protected state     !: T                                                                                                                                 ;
  id                   : string = ""                                                                                                                       ;
  mappedActions       ?: { [key: string] : string; }                                                                                                       ;
  protected init       : () => void = () => void 0                                                                                                         ;
  protected nextState  : (newState: Partial<T>, mergeToPreviousState?: boolean) => void = (newState: Partial<T>, mergeToPreviousState?: boolean) => void 0 ;
  protected sendAction : <T>(type: string, payload: T) => void = <T>(type: string, payload: T) => void 0                                                   ;
  getState() {
    return this.state;
  }
}

export type TExtentedStore<T> = TBaseStore<T> & {
  mappedActions ?: { [key: string] : string; }
}

export type TStoreDefinition<S, T, U> = {
  id              ?: string                                                               ;
  localActions    ?: boolean                                                              ;
  actions          : T                                                                    ;
  events          ?: U                                                                    ;
  mappedActions   ?: { [key: string] : string; }                                          ;
  init            ?: () => void                                                           ;
  dispatchHandler ?:(this: BaseStore<S>, payload: any, For? : TAwaitFor) => Promise<void> ;
  nextState       ?: (newState: Partial<S>, mergeToPreviousState?: boolean) => void       ;
}

type TRegisterSystem = {
  __dispatcher: Dispatcher;
}

export type TActionHandler<T> = (payload: T, For?: TAwaitFor) => TActionReturn ;
export type TActionReturn     = Promise<undefined | null | string | string[]>  ;
export type TAwaitFor         = (...ids: string[]) => Promise<void>            ;

export function withEvents<T>(source: T) {
  for(const i in source) {
    (source as any)[i] = i;
  }
  return source as T;
}

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

type TActionExtention = {[key: string]: (...args: any) => Promise<void | null | string | string[]>};

function _registerStore<State, Actions extends TActionExtention, Events extends { [key: string]: string}> (this: any, def: TStoreDefinition<State, Actions, Events>) {
  const _this = <TRegisterSystem>this;
  
  if (!_this.__dispatcher) _this.__dispatcher = new Dispatcher();
  const store = new BaseStore<State>();
  store.mappedActions = def.mappedActions;
  if (!def.id) def.id = Guid.getGuid();
  _this.__dispatcher.registerStore(store, def.id);

  const _actions = {} as {
    [P in keyof Actions] : PropType<Parameters<Actions[P]> , "0"> extends object ? 
      (payload: PropType<Parameters<Actions[P]> , "0">) => void 
      : 
      () => void;
  };

  for (const key in def.actions) {
    (_actions as any)[key] = (_: any) => {
      _this.__dispatcher.dispatch({type: def.localActions ? `${def.id}-${key}` : key, ..._});
    };
    (store as any)[def.localActions ? `${def.id}-${key}` : key] = def.actions[key];
  }

  if (def.dispatchHandler) {
    (store as any)["dispatchHandler"] = def.dispatchHandler;
  }

  const _subscribeTo = {} as {
    [P in keyof Events]: (handler: (newState: State) => void) => EventBusAutoOff;
  } & {
    All: (handler: (newState: State) => void) => EventBusAutoOff;
  };

  for (const key in def.events) {
    (_subscribeTo as any)[key] = (_: any) => {
      return _this.__dispatcher.subscribe(store.id!, _, key);
    }
  }

  (_subscribeTo as any)["All"] = (_: any) => {
    return _this.__dispatcher.subscribe(store.id!, _, "ALL");
  }

  if (def.init) {
    store["init"] = def.init;
    store["init"]();
  }

  if (def.nextState) {
    store["nextState"] = def.nextState;
  }

  return {
    id          : store.id             ,
    actions     : _actions             ,
    subscribeTo : _subscribeTo         ,
    getState    : () => store["state"] ,
  }
}

const dp = new Dispatcher();
export const registerStore = _registerStore.bind({ __dispatcher: dp });

 sFDebugger["evtBus"]      = dp["_EvtBus"] ;
 sFDebugger["_dispatcher"] = dp            ;