import { Source } from "./source";
import { Facebook } from "./facebook";
import { Twitter } from "./twitter";
import { Google } from "./google";
import { Custom } from "./custom";
import { Initials } from "./initials";
import { Gravatar } from "./gravatar";
import { Skype } from "./skype";
import { Value } from "./value";
import { Vkontakte } from "./vkontakte";
import { Github } from "./github";

import { Injectable } from "@angular/core";
import { SourceCreator } from "./source.creator";

/**
 * Factory class that implements factory method pattern.
 * Used to create Source implementation class based
 * on the source Type
 * 
 * @export
 * @class SourceFactory
 */
@Injectable()
export class SourceFactory {

    private _sources: { [key: string]: SourceCreator; } = {};

    constructor() {
        this._sources['facebook'] = Facebook;
        this._sources['twitter'] = Twitter;
        this._sources['google'] = Google;
        this._sources['skype'] = Skype;
        this._sources['gravatar'] = Gravatar;
        this._sources['custom'] = Custom;
        this._sources['initials'] = Initials;
        this._sources['value'] = Value;
        this._sources['vkontakte'] = Vkontakte;
        this._sources['github'] = Github;

    }

    public newInstance(sourceType: string, sourceValue: string): Source {
        return new this._sources[sourceType](sourceValue);
    }
}