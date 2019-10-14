# shell-commands
Custom bash commands added to ~/.bashrc file on you local dev environment.


## git clone webshield-dev by repo-name
```bash
# git clone git clone https://github.com/webshield-dev/<repo_name>
cws () { git clone https://github.com/webshield-dev/"$@".git; }
clonews () { git clone https://github.com/webshield-dev/"$@".git; }
```

## git clone flavioespinoza by repo-name
```bash
cflavio () { git clone https://github.com/flavioespinoza/"$@".git; }
cloneflavio () { git clone https://github.com/flavioespinoza/"$@".git; }
```

## Record shell or terminal
- requires install of [asciinema](https://asciinema.org/docs/how-it-works)

```bash
recordshell () { asciinema rec "$@" --title="$@"; }
recshell () { asciinema rec "$@" --title="$@"; }
playshell () { asciinema play "$@"; }
```


