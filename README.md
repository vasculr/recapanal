# reCAPTCHA analysis
This is an analysis of Google's reCAPTCHA. Only v2 is considered at this time.

Some web forms require a reCAPTCHA to be solved before they will be submitted to the server.
 - this is a two-phase commit, first of all loading an arbitrary challenge from a google server
 - solving the challenge and embedding a token in the form
 - ... and then once the form is submitted, the token is tested by the server with a google api call for validation

The thought is - what's stopping Google from harvesting form data? There is a high likelihood that a form requiring 'i am human' validation will in fact contain personally identifying information that a privacy-minded individual wouldn't provide to 3rd parties willingly.

In addition to this, often times the user data have been provided in the form already, and the capture is placed near the end, next to the submit button:
 - in all likelihood, a user will proceed to fill the form out and then encounter the captcha challenge and proceed to complete that as well
 - an unintended effect of this is the user's private data may be submitted to Google as part of the captcha processing
 - indeed, this author had the idea whilst reviewing a government-provided form which required full name, health provider numbers, name of dependents, licence number and expiry, date of birth, etc.
 - the recaptcha challenge hadn't been loaded because the excellent umatrix prevented this from happening, but of course, the form was not functional

phase 1 of this hypothesis proves that the challenge code is scrutinising any/ all form values

phase 2 shall attempt to determine whether these values are transmitted to google as part of the challenge

phase 3 would like to consider possible solutions to audit, and possibly prevent, private data being queried through javascript form scraypn

# Resources
The excellent https://beautifier.io/ is used to de-obfuscate/ de-minify the reCAPTCHA code ```v2_*.js``` in this repository.

Some great info here on reverse-engineering the reCAPTCHA code:
 - https://github.com/neuroradiology/InsideReCaptcha
 - https://en.wikipedia.org/wiki/XTEA

Google's doco on the topic: https://developers.google.com/recaptcha/docs/versions and the blog announcement https://security.googleblog.com/2014/12/are-you-robot-introducing-no-captcha.html

Solving captchas using the audio-challenge: http://uncaptcha.cs.umd.edu/

How does new Google reCAPTCHA work: https://stackoverflow.com/q/27286232

What triggers Google's reCAPTCHA: https://security.stackexchange.com/q/124532

How does Google's “No Captcha reCaptcha” work: https://security.stackexchange.com/q/78807

http://scraping.pro/no-captcha-recaptcha-challenge/ and http://scraping.pro/recaptcha-solved-imacros/#brute_force

A potential CAPTCHA phishing attack against reCAPTCHA: https://security.stackexchange.com/a/71278

Is there anything insecure about Google ReCaptcha: https://security.stackexchange.com/q/101324

Would using Google reCAPTCHA allow Google to cheat: https://security.stackexchange.com/q/53218

https://www.blackhat.com/docs/asia-16/materials/asia-16-Sivakorn-Im-Not-a-Human-Breaking-the-Google-reCAPTCHA-wp.pdf

Making 50 cents an hour solving captchas: https://2captcha.com/make-money-online



phase 1
=======
It was trivial to prove the completed form data are being picked up by the challenge code - requirements are:
 - Firefox 52.9+ extended support release
 - extension - 'uMatrix'
 - extension - 'Custom Style Script' 0.1.2 (user-defined javascript code injector)

configure the custom style script add-on with a new entry containing the following:
 - url: *
 - domain: <blank>
 - top: <blank>
 - tab: <checked>
 - javascript: (see [inject.201807.js](https://github.com/vasculr/recapanal/blob/master/inject.201807.js))
 - style: <blank>
 - active: <yes (ui element darkened)>

go to the url: 
 - https://recaptcha-demo.appspot.com/recaptcha-v2-checkbox-explicit.php
 - https://www.google.com/recaptcha/api2/demo
 - any other recaptcha url

f12 to open the developer tools adjunct in the browser - this is where the debug logging is printed

tick the 'i am not a robot' checkbox

observe that the console.log and console.trace logging messages from the overridden e.value property getter setter




# EdDSA/ ECDH

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEXAN2BRYJKwYBBAHaRw8BAQdAk/DzTATsyWBCpH9fsCryR7ilbAWVe6IUnrJ8
Iw7BLbi0K3Byb3Rvbi5jYXBpbGxhcnkgPGNhcGlsbGFyeUBwcm90b25tYWlsLmNv
bT6IkAQTFggAOBYhBBYbB6FwY2izGQhciVicilGf6xY5BQJcA3YFAhsDBQsJCAcC
BhUKCQgLAgQWAgMBAh4BAheAAAoJEFicilGf6xY5QEQBAJwNXg8+Ja1l887ycCnT
b76kARbX2Ea/Af0R6lC5gOemAQDUfSBPUijnBRyvDez0i3KpV+WM3GOnWJn6oufW
+0/aDbg4BFwDdgUSCisGAQQBl1UBBQEBB0A3NKFowvbfkhLlG3AoYjsG25k3z8WF
1AIzyv2n516GYAMBCAeIeAQYFggAIBYhBBYbB6FwY2izGQhciVicilGf6xY5BQJc
A3YFAhsMAAoJEFicilGf6xY5BxYA/RDALqx6Map5FOqbN1r6XBaaRuRGAMRDtqam
Pw2eNmG+AQCvJ1wWST4mPqWrohTjVipYOAr6WzBnX/3+6lswxtdAAg==
=zbsu
-----END PGP PUBLIC KEY BLOCK-----
```
