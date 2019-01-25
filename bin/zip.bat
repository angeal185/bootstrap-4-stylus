@if (@a==@b) @end   /* JScript ignores this multiline comment

:: zip.bat file/folder1 [file/folder2 [file/folder3 etc...]] [-o outfile.zip]
:: creates a zip file

@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    echo Usage: %~nx0 [-o outfile.zip] "file1 or folder1" ["file2 or folder2"] etc.
    echo If -o is not used, the zip file is named based on the first infile.
    goto :EOF
)

:: convert wildcards to individual filenames
for %%I in (%*) do (
    echo(%%I | findstr "[\*\?]" >NUL && (
        for /f "tokens=*" %%x in ('dir /b %%I') do set "args=!args! "%%~fx""
    ) || set "args=!args! "%%~I""
)

if "!args!" equ "" (
    echo(%* does not exist.
    goto :EOF
)
cscript /nologo /e:Jscript "%~f0" !args!

goto :EOF

:: end of batch portion / begin JScript portion */
var files = [], outfile,
    fso = new ActiveXObject("scripting.filesystemobject"),
    shl = new ActiveXObject("shell.application");

function chr(n) { return String.fromCharCode(n); }

for (var i=0; i<WSH.Arguments.length; i++) {
    if (WSH.Arguments(i).toLowerCase() == '-o') outfile = WSH.Arguments(++i);
    else files.push(WSH.Arguments(i));
}
if (!outfile) try { outfile = files[0].split(/[\/\\]/)[0] + '.zip'; }
catch(e) { outfile = 'archive.zip'; } // Probably never see this, but just in case.

WSH.Echo('Creating ' + outfile);

var zip = fso.CreateTextFile(outfile);
zip.Write("PK" + chr(5) + chr(6));
for (var i=18; i>0; i--) zip.Write(chr(0));
zip.Close()
zip = shl.NameSpace(fso.GetFile(outfile).Path);

for (var i=0; i<files.length; i++) {
    try {
        if (fso.FileExists(files[i])) {
            var file = fso.GetFile(files[i]);
        } else if (fso.FolderExists(files[i])) {
            var file = fso.GetFolder(files[i]);
            if (!shl.NameSpace(file.Path).Items().Count) {
                // Windows can't add an empty folder to a zip file, but
                // it *can* add a folder that contains an empty folder.
                shl.NameSpace(file.Path).NewFolder('(empty)');
            }
        } else {
            throw "Unable to locate " + files[i];
        }
        var folder = shl.NameSpace(file.ParentFolder + '\\'),
        zipThis = folder.ParseName(fso.GetFileName(files[i]));
    }
    catch(e) {
        var output = 'Skipping ' + files[i] + ': ';
        output += (typeof e === 'string') ? e : (
            e.description ? e.description : 'error ' + e.number + ' (unspecified error)'
        );
        WSH.Echo(output);
        files.splice(i--,1);
        continue;
    }
    WSH.StdOut.Write('Compressing ' + fso.GetFileName(file) + '... ');
    zip.CopyHere(zipThis);
    while (zip.Items().Count <= i) {
        WSH.Sleep(50);
    }
    WSH.Echo('Done.  (' + zip.Items().Count + ' of ' + files.length + ')');
}

if (!zip.Items().Count) {
    fso.DeleteFile(fso.GetFile(outfile));
    WSH.Echo('Zip file is empty.  Deleting.');
}
