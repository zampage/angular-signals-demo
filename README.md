# Signals Demo

This is a demo for angular signals.

![UI](src/assets/ui.PNG)

## Explanation

"Signals are the cornerstone of reactivity in Solid. They contain values that change over time; when you change a signal's value, it automatically updates anything that uses it."

- signals are similar to RxJS BehavorSubject
- signals work similar to the CD OnPush + async pipe pattern
- signals will longterm replace ZoneJS
- signals will **not** replace RxJS
- convertion from signal to observable and vice versa will be possible (not much info on this yet)

"All this boils down to one thing: While both are reactive by nature, RxJs and signals solve different issues. They are complementing each other, they are not substitutes for each other. Together, they will allow for much more powerful and straightforward Angular applications."

## Ressources

- [Angular Implementation](https://github.com/angular/angular/tree/main/packages/core/src/signals)
- [Everything you need to know](https://dev.to/this-is-angular/angular-signals-everything-you-need-to-know-2b7g)
- [Initially from SolidJS](https://www.solidjs.com/tutorial/introduction_signals)
- [Angular is back with a vengeance](https://www.youtube.com/watch?v=nQ2A30cD3Q8)
- [Angular is about to get its most IMPORTANT change in a long time...](https://www.youtube.com/watch?v=4FkFmn0LmLI)
- [Why didn't the Angular team just use RxJS instead of Signals?](https://www.youtube.com/watch?v=iA6iyoantuo)
