# PHP Dump

## Usage

```php
pd()->log("Text/Array/Something") // Symfony Var-Dumper -> black
pd()->green("Text/Array/Something"); // Symfony Var-Dumper


// Same structure with pdd but dies after sending


// Utility Methods

pd()->trace(); // debug_backrace(); mapped as table in payload

$time = pd()->time('Doing something') // Stopwatch mapped as table in payload
$time->checkpoint(); // Do we want this? 
$time->stop(); // Output: elapsed time, memory usage

pd()->timeFunc('Do something', function() {
    sleep(1);
});


pd()->pause(); // while loop with sending a lock. Checks in loop is the lock released

pd()->measure();

pd()->clear();

pd()->send(new CustomMessage())

pd()->shopware()->dalDump()

pdSw()->
```


```json
{
    "uuid": "UUID",
    "time": "timestamp",
    "tags": ["Query"],
    "payloads": [
        {
            "type": "code",
            "content": {
                "language": "sql",
                "value": "SLECT * FROM xxxx"
            }
        },
        {
            "type": "html",
            "content": "HTML FROM SYMFONY VAR_DUMPER"
        },
        {
            "type": "table",
            "content": {
                "header": ["Header 1", "Header 2"],
                "rows": [
                    ["Val1", "Val2"],
                    ["Val3", "Val4"]
                ]
            }
        }
    ],
    "origin": {
        "file": "xxx.php",
        "line_number": 1234
    }
}
```
