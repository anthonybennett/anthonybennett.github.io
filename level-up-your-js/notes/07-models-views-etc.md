# Models, Views, etc.

A super-fast introduction to MVC, MVP, and MVVM...

## The Model-View-Controller Pattern (MVC)

- Models: data.
- Views: user interfaces.
- Controllers: business logic and glue between Models and Views.

Originating in the 1970s, and building on the Observer, Strategy,
and Composite patterns, MVC was created to write desktop applications.
In more recent years, it was adapted to server side web applications.
As JavaScript has evolved, many frameworks have emerged and attempted
to implement MVC on the  client side.

## The Model-View-Presenter Pattern (MVP)

MVP originated in the 1990s. Here, the Presenter contains the UI
business logic for the View. Typically, MVP Views are "passive"
or "dumb", and the responsibility of binding the Model and the
View falls to the Presenter.

## The Model-View-ViewModel Pattern (MVVM)

MVVM was created in the 2000s. Here, Models are "dumb" (AKA Plain
Old JavaScript Objects, or POJOs). Views, meanwhile, are typically
"active"; that is, they are bound to the ViewModel. This is done
via fairly complex templates with declarative bindings. Finally,
the ViewModel plays the role of a Controller that maps data between
the Model and the View.

## High-Level Questions I Don't Have Time to Answer

Views are awkward in JS because of the tight coupling between templates
and the DOM. So either you get lot of markup in your JS, or you end up
with a lot of JS in your templates. Should templates be "dumb", with
no logic in them? Or should we move as much logic as possible to them?
How do we handle syncing (AKA binding) the Model and the View? Should
there be one big View or lots of little ones, possibly nested?

Where you do store state for your application? Is it its own Model?
Does it live off the main Model? Do you just add it to the Controller?
For that matter, what is a Controller, exactly?

In Backbone, for example, the primary nouns are Models and Views.
Sets of Models are grouped as Collections, and Views are usually
supplemented by templates (e.g. Underscore or Handlebars). There
are no Controllers: Views and Models split that role, and often
a fair amount of logic lives in the templates.

Meanwhile, there are devs who have invested heavily into a particular
library, and who have things figured out for their use-cases, probably
having developed their own conventions or higher-level library atop
the off-the-shelf solution (e.g. Marionette). But now they're stuck
with that library, even if they've discovered another one they like
more (say, Angular).

Then there are other devs who don't have a dog in this fight. Their
projects are either small enough that porting to another library isn't
a big deal, or they have the freedom to write their next project using
any library they want (which can become a support nightmare over time).
If anything, these devs are faced with analysis paralysis: there are
so many choices out there, they don't know which one to choose.

And so, while there are still a lot of devs doing amazing work with
any given library, some devs are opting to keep things simpler, and
eschew the rigid conventions of a strict MVC (or derivative) pattern.
They either roll their own library, or borrow bits and pieces from
established libraries.

## References and Additional Reading

- [JS MV* Patterns](http://goo.gl/Yp9To)
- [Smalltalk MVC Translated to JS](http://goo.gl/5uXdsZ)
- [Maria (MVC)](http://goo.gl/FUDpy)
- [Angular (MVC)](https://angularjs.org/)
- [Riot (MVP)](https://muut.com/riotjs/)
- [Knockout (MVVM)](http://knockoutjs.com/)
- [Backbone (MV*)](http://backbonejs.org/)
- [Marionette](http://marionettejs.com/)
- [React (V)](http://goo.gl/oJu0W)
- [Opinionated Rundown of JS Frameworks](http://goo.gl/C9YeF7)
- [Why You Should Not Use AngularJS](http://goo.gl/hmrC7O)