# README

In the beginning...

Then there was light ... urrr ... rebirth as a typescript app...

## To initialize the project

```zsh
mkdir kbase-ui-crats
cd kbase-ui-crats
git init
code .
```

Create this file and document how we got to this line we are typing now.

## Create the app skeleton

```zsh
yarn create react-app react-app --template typescript

```

Okay, that is so easy isn't it?

So, what do we save of kbase-ui?

Well, at the heart of kbase-ui, and critical for the next year or so, is the plugin.

Since raw plugins are now limited to just a handful of internal plugins, we can dispense with that. That leaves us with the iframe plugin method.

We can replace the raw, internal plugins with plain components now. 

There is still the odd issue of routing. We may need to implement this ourselves, and honestly it isn't very hard, and it isn't very hard to switch back and forth. But we do need to continue to support hash style routes, and we do need do allow the composition of routes at build time.

Now, following the kbase-ui-docs for plugins...

enhance with ant design:

```zsh
yarn add antd @craco/craco craco-antd nodemon
```

and the follow up for package.json.

Also follow relevant chapters for setting up vsc integration better, and nuking the built-in react ui stuff.

There is more to do, but for a hot minute I just want to build out a little bitt.

All very well, I had a good bit if fun building up the layout - header, sidebar,etc.

Now time to integrate redux into it...

so following kbase-ui-docs instructions for adding deps.

but the setup of redux will be different.

for one, we'll want to set up directories for store, actions, and reducers.

second, we won't use ui-components, rather we'll copy the code into kbase-ui and make the necessary changes. Maybe we can use ui-components, but at the moment I don't want to fuss with the impedance mismatch.

Also, we need to incorporate the kbase-ui specific parts of the store. Maybe do that first, just to get a working store.

Also, this time we'll try hard to use combine-reducers; maybe redux boilerplate?


Let's base this on redux toolkit, or at least try. We can always go back to manual setup if it looks too cranky...


yarn add @reduxjs/toolkit react-redux @types/react-redux

nice, that is just one dep instead of four!

okay, well, two, we need react-redux still.

actually, lets hold off on that, do manual redux for now.

yarn add redux react-redux @types/react-redux redux-thunk

Now we need to start designing the data model.

Much of it will come from @kbase/ui-components (auth, config), but we'll add that later.

For now, let's focus on what is new here -- the data model for the kbase-ui app itself.

Let us see...

We should keep in mind top level properties for major functions. If we keep the idea of services, 
there should be a top level for services, and a sub-property for each service.

And the top ui has some concerns like navigation, app title, etc.

LEFT OFF HERE

For some reason I can't get the load() thunk to run correct ...

okay, that was silly, just forgot to wrap in dispatch.

Just added the app, app config, and auth from @kbase/ui-components.

Refactored redux to separate store/action/reducers into directory by top level concern (app, auth, ...)

Still not sure about this..

