---
id: settings
title: Settings
---


<AUTOGENERATED_TABLE_OF_CONTENTS>


## Reference


### `ZING_TITLE`

Default: _'Zing Translation Server'_

The name of the Zing server.


### `ZING_LOG_DIRECTORY`

Default: `working_path('log')`

The directory where Zing writes event logs to. These are high-level
logs of events on store/unit changes and manage.py commands executed


### `ZING_CONTACT_EMAIL`

Default: _""_ (disabled)

Address to receive messages sent through the contact form. If unset, the contact
form feature won't be available.


### `ZING_CONTACT_REPORT_EMAIL`

Default: `ZING_CONTACT_EMAIL`

Email address to report errors on strings.


### `ZING_SIGNUP_ENABLED`

Default: `True`

Controls whether user sign ups are allowed or not. If set to `False`,
administrators will still be able to create new user accounts.


### `ZING_REPORTS_MARK_FUNC`

Default: _""_ (unset)

The graph of a user's activity, within reports, can be
[marked](https://code.google.com/archive/p/flot-marks/) to indicate events by
using this function. The setting must contain an import path to such a marking
function (string).

The function receives the user and graph ranges and returns an array of
applicable marks.

Parameters:

- `username` - user for whom we're producing this graph
- `start` (datetime) - start date of the graph
- `end` (datetime) - end date of the graph

The function must return an *array of dictionaries* (marks), where every mark
has the following properties:

- `position`, specifying the point in the x-axis where the mark should
be set (UNIX timestamp multiplied by 1000), and
- `label` specifying the text that will be displayed next to the mark.


### `ZING_INVOICES_PHANTOMJS_BIN`

Default: `None` (unset)

Absolute path to the [PhantomJS binary](http://phantomjs.org/). This is
needed in order to optionally generate PDF invoices out of user activity.


### `ZING_INVOICES_DIRECTORY`

Default: `working_path('invoices')`

Base directory where the invoices will be created. Invoices will be generated
in subdirectories for each year and month combination, i.e.
`<ZING_INVOICES_DIRECTORY>/<YYYY-MM>/`.


### `ZING_INVOICES_COMPANY`

Default: _'ACME'_

Name of your company as displayed in the invoice. Check the templates at
*templates/invoices/* for further details and customizations.


### `ZING_INVOICES_DEPARTMENT`

Default: _'ACME Department'_

Name of your company deparment as displayed in the invoices. Check the templates
at _templates/invoices/_ for further details and customizations.


### `ZING_INVOICES_RECIPIENTS`

Default: `{}` (unset)

The list of usernames for whom invoices will be generated and send to.

The setting holds a dictionary where the keys are actual usernames of the
running Zing instance and the values are dictionaries of key-value pairs
which will hold the user-specific configuration used to construct individual
invoices.

The user configuration accepts the following keys:

* `name` (required)  
Full name as displayed in the invoice. The official "full" person name can be
different from the public *shortened* version available in the user's profile,
hence this name is used instead as it's dealing with financial documents.

* `wire_info` (required)  
Wire information which includes payment details. This can be a multi-line string
and it will be rendered as such in the invoice, with leading whitespace removed.

* `paid_by` (required)  
Official name of the company/person paying the invoice.

* `invoice_prefix`  
Prefix used to generate invoice IDs. This will be prepended to the current month
in `YYYY-MM` format as a string.  
A recommended approach for prefixing invoices is the _"Language-Initials"_
format. For example, if there's a translator named _"John Doe"_ translating
into Spanish (ES), the prefix might look like `'ES-JD-'` and the invoices
generated for this person will be consequently named like _'ES-JD-2016-06'_,
_'ES-JD-2016-07'_ and so on. If there is a need for these IDs to be globally
unique, one needs to specify a unique prefix for each of the paid translators.

* `minimal_payment`  
Minimal payment threshold value to be reached for the payment to be initiated
during the monthly pay cycle. If the summed up amount is lower than
`minimal_payment`, the amount for the month will be carried over to the next
month.  
The amount is in the currency set along the rate for the user in the reporting
UI.

* `extra_add`  
Fixed amount to be added on top of the total accrued amounts. Use this e.g.  to
reimburse transaction fees.  
The amount is in the currency set along the rate for the user in the reporting
UI.

* `subcontractors`  
A list of usernames which will be considered as subcontractors of the main user.
This way, subcontractors' work is consolidated in a single invoice.

When sending emails with `--send-emails`, the following keys are available as
well:

* `email` (required)  
E-mail address of the translator where the invoice will be sent to. It can
contain multiple addresses separated by spaces.  
This is not read from the user profile to have a way to set it explicitly and
avoid potential conflicts when people are using different addresses for
different purposes.

* `accounting_email` (required)  
E-mail address of the company's accountants. At this address they will receive
the request to pay the invoice, along with a copy of it. It can contain multiple
addresses separated by spaces.

* `accounting_email_cc`  
E-mail address of the company's accountants which will be added in the copy of
the request for payment. It can contain multiple addresses separated by spaces.  
Check a full example below.  
```python
ZING_INVOICES_RECIPIENTS = {
    'johndoe': {
        'name': 'John Benjamin Doe',
        'invoice_prefix': 'JD-',
        'paid_by': 'ACME Corp.',
        'wire_info': u"""
            Name on Account: John Doe
            Bank: TEST BANK
            SWIFT: SWIFT number
            Agency: Agency number
            Current Account: Acc. number
            CPF: C.P.F. number
            """,

        'minimal_payment': 50,
        'extra_add': 30,
        'subcontractors': (
          '<username1>', '<username2>',
        ),

        'email': 'johndoe@example.com',
        'accounting_email': 'accountant@example.com',
        'accounting_email_cc': 'other.accountant@example.com',
    },
}
```


### `ZING_SCORE_COEFFICIENTS`

Default:

```python
{
    'EDIT': 5.0/7,
    'REVIEW': 2.0/7,
    'SUGGEST': 0.2,
    'ANALYZE': 0.1,
}
```

Parameters:

* `EDIT` - coefficient to calculate an user score change for edit actions.
* `REVIEW` - coefficient to calculate an user score change for review actions.
* `SUGGEST` - coefficient to calculate an user score change for new suggestions.
* `ANALYZE` - coefficient to calculate an user score change for rejecting
  suggestions and penalty for the rejected suggestion.


### `ZING_SYNC_FILE_MODE`

Default: `0644`

On POSIX systems, files synchronized to disk will be assigned this permission.
Use `0644` for publically-readable files or `0600` if you want only the Zing
user to be able to read them.


### `ZING_TM_SERVER`

Default: `{}` (empty dict)

Specifies the connection details for the Elasticsearch-based Translation Memory
server.

In order to enable the feature, the `HOST` and `PORT` configuration keys need to
be provided:

```python
ZING_TM_SERVER = {
  'HOST': 'localhost',
  'PORT': 9200,
}
```

The TM is automatically updated every time a new translation is submitted.

Optionally, a couple of details can be configured:

* `INDEX_NAME` (_string_) allows defining the name of the index under which the
  Translation Memory database will be constructed. It defaults to
  `translations`.

* `MIN_SIMILARITY` (_float_) serves as a threshold value to filter out results
  that are potentially too far from the source text. The Levenshtein distance is
  considered when measuring how similar the text is from the source text, and
  this represents a real value in the (0..1) range, 1 being 100% similarity.
  The default value (0.7) should work fine in most cases, although your mileage
  might vary.


### `ZING_MT_BACKENDS`

Default: `[]` (empty list)

This setting enables translation suggestions through several online services.

The elements for the list are two-element tuples containing the name of the
service and an optional API key.

Available options are:

* `GOOGLE_TRANSLATE`: Google Translate service.  For this service you need to
  obtain an API key. Note that Google Translate API is a [paid
  service](https://cloud.google.com/translate/v2/pricing).

* `YANDEX_TRANSLATE`: Yandex.Translate service.  For this service you need to
  [obtain a Yandex API key](https://tech.yandex.com/keys/get/?service=trnsl).


### `ZING_TRANSLATION_DIRECTORY`

Default: `working_path('translations')`

The directory where projects hosted on Zing store their translation files.
`sync_stores` will write to this directory and `update_stores` will read from
this directory.


### `ZING_QUALITY_CHECKER`

Default: `pootle_misc.checks.ENChecker`

The import path to a class that implements quality checks. By default, this
quality checker is used for all projects.

If unset, then the Translate Toolkit checking functions can be used, which can
be set on a per-project basis from the projects admin pages.

> If set, only the checker function defined here is used instead of the
> Translate Toolkit counterparts. Both cannot be selectively applied.


### `ZING_WORDCOUNT_FUNC`

Default: `translate.storage.statsdb.wordcount`

The import path to a function that provides wordcounts.

Current options:

  - Translate Toolkit (default) - translate.storage.statsdb.wordcount
  - Zing - pootle.core.utils.wordcount.wordcount

Adding a custom function allows you to alter how words are counted.

> Changing this function requires that you run `refresh_stats
> --calculate-wordcount` to recalculate the associated statistics.
