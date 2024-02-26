## github commands
- git commit
- git pull
- git push

## Console

- **echo** - Output the parameters of the command
- **cd** - Change directory
- **mkdir** - Make directory
- **rmdir** - Remove directory
- **rm** - Remove file(s)
- **mv** - Move file(s)
- **cp** - Copy files
- **ls** - List files
- **curl** - Command line client URL browser
- **grep** - Regular expression search
- **find** - Find files
- **top** - View running processes with CPU and memory usage
- **df** - View disk statistics
- **cat** - Output the contents of a file
- **less** - Interactively output the contents of a file
- **wc** - Count the words in a file
- **ps** - View the currently running processes
- **kill** - Kill a currently running process
- **sudo** - Execute a command as a super user (admin)
- **ssh** - Create a secure shell on a remote computer
- **scp** - Securely copy files to a remote computer
- **history** - Show the history of commands
- **ping** - Check if a website is up
- **tracert** - Trace the connections to a website
- **dig** - Show the DNS information for a domain
- **man** - Look up a command in the manual
- 
## general notes
not sure if its easier to use vsCode or the command line. vsCode handled the merge conflicts very different than the github page says. but if you edit the actual file then do a whole new commit a few times it works.

good note don't use the canvas to do this use the web page that is [this](https://learn.cs260.click/)
## Server Notes
- To ssh into the server use this 
- IP address = 18.214.45.63
- URL = http://18.214.45.63/ or [gardentimer.click](https://gardentimer.click/)
```
ssh -i [key pair file] ubuntu@[ip address]
ssh -i ~/keys/production.pem ubuntu@53.104.2.123
```
## HTML Notes
I need a page for login a page to view the plants, and page to see information on the plants and I will do an about page. My HTML small assignment links here [media](https://codepen.io/kobydj/pen/QWoqvRL) [input](https://codepen.io/kobydj/full/LYazWzY) [structure](https://codepen.io/kobydj/pen/abMyRQw)

I have included an info page on my starter im not sure if i will have it be a page or if it will just pop up when you click on the plants. I also probably ought to make the password box write as circles instead of letters.
## CSS Notes

## JAVASCRIPT Notes

The function `makeClosure` returns an anonymous function using the arrow syntax. Notice that the `a` parameter is overridden, a new `b` variable is created, and both `a` and `b` are referenced in the arrow function. Because of that reference, they are both part of the closure for the returned function.

```js
function makeClosure(a) {
  a = 'a2';
  const b = 'b2';
  return () => [a, b];
}
```

Next, we declare the variables `a` and `b` at the top level scope, and call `makeClosure` with `a`.

```js
const a = 'a';
const b = 'b';

const closure = makeClosure(a);
```

Now, when we call `closure` function it will output the values contained in scope where it was created instead of the current values of the variables.

```js
console.log(closure());
// OUTPUT: ['a2', 'b2']

console.log(a, b);
// OUTPUT: 'a' 'b'
```



