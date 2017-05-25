# # &lt;ng-avatar&gt;
[![Build Status](https://travis-ci.org/HaithemMosbahi/angular2-avatar.svg?branch=master)](https://travis-ci.org/HaithemMosbahi/angular2-avatar)

![Angular Avatar component preview](demo/demo.png)


A universal avatar component for Angular applications that generates avatar image from different sources and provides a fallback options out of the box.

You can use this component whether you have a single source such as facebook, google, etc,  or a multiple avatar sources.

 Moreover, the component can shows name initials or a value as avatar.

 Supported avatar sources:

 * Facebook
 * Google
 * Twitter
 * Skype
 * Gravatar
 * Custom image
 * name initials
 * value
## Installation

Install avatar component using [NPM](https://www.npmjs.com/)::

```bash
$ npm install angular2-avatar --save
```
Or [download as ZIP](https://github.com/HaithemMosbahi/angular2-avatar/archive/master.zip).


## Usage

1. Import AvatarModule :

Once you have installed ng2-avatar, you can import it in your `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your AvatarModule
import { AvatarModule } from 'angular2-avatar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify AvatarModule as an import
    AvatarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
2. Start using it:

Once the AvatarModule is imported, you can start using the component in your Angular application:

```html
<ng-avatar></ng-avatar>
```
## Examples

```html
<ng-avatar facebookId="1508319875"></ng-avatar>
<ng-avatar googleId="1508319875"></ng-avatar>
<ng-avatar twitterId="1508319875"></ng-avatar>
<ng-avatar name="Jhon Doe"></ng-avatar>
<ng-avatar value="75%"></ng-avatar>

<ng-avatar source="facebook" skypeId="skype" googleId="google" name="Haithem Mosbahi" custom="assets/custom.jpg" value="28%" initials facebookId="100008343750912" twitterId="twitter" gravatarId="gravatar" size="100" [round]="true"></ng-avatar>

```

## Options

|   Attribute   |      Type      | Default |                                              Description                                               |
| ------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `facebook-id` | *string* |         |                                                                                                        |
| `twitter-id` | *string* |         |                                                                                                        |
| `google-id`   | *string*             |         |                                                                                                        |
| `skype-id`    | *string*          |         |                                                                                                        |
| `name`        | *string*          |         | Will be used to generate avatar based on the initials of the person                                    |
| `value`       | *string*          |         | Show a value as avatar                                                                                 |
| `color`       | *string*          | random  | Give the background a fixed color with a hex like for example #FF0000 |
| `fgColor`     | *string*          | #FFF  | Used in combination with `name` and `value`. Give the text a fixed color with a hex like for example #FF0000 |
| `size`        | *number*             | 50      | Size of the avatar                                                                                     |
| `textSizeRatio` | *number*             | 3      | For text based avatars the size of the text as a fragment of size (size / textSizeRatio)                                 |
| `round`       | *bool*            | true   | Round the avatar corners                                                                               |
| `src`         | *string*          |         | Fallback image to use                                                                                  |
| `style`         | *object*          |         | Style that will be applied on the root element

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Haithem Mosbahi](mailto:elmosbahihaithem@gmail.com)
