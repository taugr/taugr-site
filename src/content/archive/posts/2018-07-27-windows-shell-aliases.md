---
title: 'Windows Shell Aliases'
description: 'What Windows shell aliases are and how to use them.'
date: 2018-07-27
tags: ['powershell']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-07-27-windows-shell-aliases/'
archivePath: '2018-07-27-windows-shell-aliases'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-07-27-windows-shell-aliases/](https://tomauger.gitlab.io/posts/2018-07-27-windows-shell-aliases/).

What Windows shell aliases are and how to use them.

## Shell Aliases

Shell aliases allow you to navigate to special folders on Windows. They can be used in the Windows explorer, the start menu, and the Run dialog. For example, open the run dialog (`Win+R`) and type `shell:personal` and hit enter. Windows explorer will open in your `Documents` directory.

A complete list of these folders can be found in the following registry key:

```powershell
HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions
```

To enumerate their names and the relative path you can run the following PowerShell script:

```powershell
Get-ChildItem HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FolderDescriptions |
ForEach-Object {
    New-Object `
        -TypeName psobject `
        -Prop (@{ RelativePath = $_.GetValue('RelativePath'); Name = $_.GetValue('Name') })
} |
Sort-Object -Property Name |
Format-Table Name,RelativePath
```

The available commands varies depending on your version of Windows. On my system (Windows 10 Pro) the above script produces the following list:

```powershell
Name                        RelativePath
----                        -------
3D Objects                  3D Objects
AccountPictures             Microsoft\Windows\AccountPictures
AddNewProgramsFolder
Administrative Tools        Administrative Tools
AppData                     AppData\Roaming
AppDataDesktop              Desktop
AppDataDocuments            Documents
AppDataFavorites            Favorites
AppDataProgramData          ProgramData
Application Shortcuts       Microsoft\Windows\Application Shortcuts
AppMods                     AppMods
AppsFolder
AppUpdatesFolder
Cache                       Microsoft\Windows\INetCache
Camera Roll                 Camera Roll
CameraRollLibrary           CameraRoll.library-ms
Captures                    Captures
CD Burning                  Microsoft\Windows\Burn\Burn
ChangeRemoveProgramsFolder
Common Administrative Tools Administrative Tools
Common AppData
Common Desktop              Desktop
Common Documents            Documents
Common Programs             Programs
Common Start Menu           Microsoft\Windows\Start Menu
Common Start Menu Places    Microsoft\Windows\Start Menu Places
Common Startup              StartUp
Common Templates            Microsoft\Windows\Templates
CommonDownloads             Downloads
CommonMusic                 Music
CommonPictures              Pictures
CommonRingtones             Microsoft\Windows\Ringtones
CommonVideo                 Videos
ConflictFolder
ConnectionsFolder
Contacts                    Contacts
ControlPanelFolder
Cookies                     Microsoft\Windows\INetCookies
CredentialManager
CryptoKeys
CSCFolder
Desktop                     Desktop
Development Files           DevelopmentFiles
Device Metadata Store       Microsoft\Windows\DeviceMetadataStore
DocumentsLibrary            Documents.library-ms
Downloads                   Downloads
DpapiKeys
Favorites                   Favorites
Fonts
GameTasks                   Microsoft\Windows\GameExplorer
History                     Microsoft\Windows\History
HomeGroupCurrentUserFolder
HomeGroupFolder
ImplicitAppShortcuts        ImplicitAppShortcuts
InternetFolder
Libraries                   Microsoft\Windows\Libraries
Links                       Links
Local AppData               AppData\Local
Local Documents             Documents
Local Downloads             Downloads
Local Music                 Music
Local Pictures              Pictures
Local Videos                Videos
LocalAppDataLow             AppData\LocalLow
LocalizedResourcesDir
MAPIFolder
MusicLibrary                Music.library-ms
My Music                    Music
My Pictures                 Pictures
My Video                    Videos
MyComputerFolder
NetHood                     Microsoft\Windows\Network Shortcuts
NetworkPlacesFolder
OEM Links                   OEM Links
OneDrive                    OneDrive
OneDriveCameraRoll          Camera Roll
OneDriveDocuments           Documents
OneDriveMusic               Music
OneDrivePictures            Pictures
Original Images             Microsoft\Windows Photo Gallery\Original Images
Personal                    Documents
PhotoAlbums                 Slide Shows
PicturesLibrary             Pictures.library-ms
Playlists                   Playlists
PrintersFolder
PrintHood                   Microsoft\Windows\Printer Shortcuts
Profile
ProgramFiles
ProgramFilesCommon
ProgramFilesCommonX64
ProgramFilesCommonX86
ProgramFilesX64
ProgramFilesX86
Programs                    Programs
Public
PublicAccountPictures       AccountPictures
PublicGameTasks             Microsoft\Windows\GameExplorer
PublicLibraries             Libraries
Quick Launch                Microsoft\Internet Explorer\Quick Launch
Recent                      Microsoft\Windows\Recent
Recorded Calls              Recorded Calls
RecordedTVLibrary           RecordedTV.library-ms
RecycleBinFolder
ResourceDir
Retail Demo                 Microsoft\Windows\RetailDemo
Ringtones                   Microsoft\Windows\Ringtones
Roamed Tile Images          Microsoft\Windows\RoamedTileImages
Roaming Tiles               Microsoft\Windows\RoamingTiles
SavedGames                  Saved Games
SavedPictures               Saved Pictures
SavedPicturesLibrary        SavedPictures.library-ms
Screenshots                 Screenshots
Searches                    Searches
SearchHistoryFolder         Microsoft\Windows\ConnectedSearch\History
SearchHomeFolder
SearchTemplatesFolder       Microsoft\Windows\ConnectedSearch\Templates
SendTo                      Microsoft\Windows\SendTo
Start Menu                  Microsoft\Windows\Start Menu
Startup                     StartUp
SyncCenterFolder
SyncResultsFolder
SyncSetupFolder
System
SystemCertificates
SystemX86
Templates                   Microsoft\Windows\Templates
ThisDeviceFolder
ThisPCDesktopFolder         Desktop
User Pinned                 User Pinned
UserProfiles
UserProgramFiles            Programs
UserProgramFilesCommon      Common
UsersFilesFolder
UsersLibrariesFolder
VideosLibrary               Videos.library-ms
Windows
```

The first column gives the name of the shell command, so for example the first entry has name `AccountPictures` and the corresponding shell command is `shell:AccountPictures`.

Note that some of the names include a space and this must also be present in the shell command, for example the name `My Video` becomes the shell command `shell:My Video`.
