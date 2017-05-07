# angular2-avatar
[![Build Status](https://travis-ci.org/HaithemMosbahi/angular2-avatar.svg?branch=master)](https://travis-ci.org/HaithemMosbahi/angular2-avatar)]
## Installation

To install this library, run:

```bash
$ npm install angular2-avatar --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install angular2-avatar
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
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

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use avatar component in app.component.html -->
<h1>
  {{title}}
</h1>
<ng-avatar></ng-avatar>
```

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
