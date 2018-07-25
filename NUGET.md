Operações com NUGET
===================

## pack

```powershell
 .\build\nuget.exe pack -OutputDirectory dist
```

# push

```powershell
.\build\nuget.exe push .\dist\jquery-toad.${version}.nupkg -source https://api.nuget.org/v3/index.json -apikey ${api}
```
