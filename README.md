# All-Inkl.com `mailto:` link handler

This Chrome extension opens `mailto:` links by default in the [All-Inkl.com web mailer](https://webmail.all-inkl.com/).

### Usage

* Clone or download the repository, then use Chrome's "load unpacked extension" feature. Currently, I have no plans of submitting the extension to the Chrome web store, because probably there will not be many users and the extension needs to be migrated from manifest V2 to V3 anyway in order to continue functioning in 2023.
* Click any `mailto:` link and compose your message directly the All-Inkl.com web mailer.
* Please note that you must be logged into the web mailer already, because it does not provide any "compose new e-mail" link URL. If you happen to be logged into multiple accounts in multiple open browser tabs, a new e-mail will be created for the `mailto:` link in each of them. You just send it where you prefer and cancel message composition in the other(s). 

### Test

When you have the extension installed, try clicking these links:
* <a href="mailto:fake@example.com">Basic e-mail address (To)</a>
* <a href="mailto:info@acme.org?cc=cc@acme.org&bcc=bcc@acme.org&subject=German%20umlauts%20%C3%A4%C3%B6%C3%BC%20%C3%84%C3%96%C3%9C&body=Hello%20world!%0D%0A%0D%0ACreating%20e-mails%20from%20'mailto%3A'%20links%20is%20not%20so%20difficult.%20%F0%9F%99%82">To, CC, BCC, subject and body</a>

If you want to compose and test your own `mailto:` links, try https://mailtolink.me/. I am not affiliated with that web site, I just found it during a web search for an online `mailto:` link generator. 

### Credits

Inspired by [MailtOWA](https://github.com/jonroig/MailtOWA).
