# npm-idk

When working on many node different projects, you don't know if the project uses npm, yarn, or something else. I just want to install my dependencies. Give me a break. 

# Install 

```
deno install --allow-read="package-lock.json,yarn.lock" --allow-run npm-idk.ts

# Optional:
alias npm='npm-idk'
```

# Usage

```
npm-idk <command>

# Examples: 
npm-idk install
npm-idk install --save-dev
```

# Development 

```
deno run --allow-read="package-lock.json,yarn.lock" --allow-run npm-idk.ts install
```