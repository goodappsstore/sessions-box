# SessionsBox website

A dependency-free, light-theme landing page. Open `index.html` directly, or serve
this directory with any static web server. Deploy the entire `website/` directory,
including `assets/` and `binaries/`. All local URLs are relative, so it also works
under a hosting subdirectory. No build step is needed.

The logo is copied unchanged from `public/logo.svg`. Screenshots are the supplied
light-theme captures from `~/Documents`, copied into `assets/`. The page uses
system fonts and has no external scripts, analytics, or font requests.

## Download files

Place release bundles in `binaries/` with these exact filenames for version
**0.1.0**, matching the current `src-tauri/tauri.conf.json` version. Update the
version in all download links together for a new release. The native macOS bundle
name remains **Sessions Box**, as configured in Tauri.

| Platform | Website filename |
| --- | --- |
| macOS Apple silicon | `SessionsBox-v0.1.0-darwin-aarch64-dmg.dmg` |
| macOS Intel | `SessionsBox-v0.1.0-darwin-x64-dmg.dmg` |
| Windows x64 EXE | `SessionsBox-v0.1.0-windows-x64-nsis-setup.exe` |
| Windows x64 MSI | `SessionsBox-v0.1.0-windows-x64-msi.msi` |
| Windows ARM64 EXE | `SessionsBox-v0.1.0-windows-arm64-nsis-setup.exe` |
| Windows ARM64 MSI | `SessionsBox-v0.1.0-windows-arm64-msi.msi` |
| Linux x64 AppImage | `SessionsBox-v0.1.0-linux-amd64-appimage.AppImage` |
| Linux x64 DEB | `SessionsBox-v0.1.0-linux-amd64-deb.deb` |
| Linux x64 RPM | `SessionsBox-v0.1.0-linux-x86_64-rpm.rpm` |
| Linux ARM64 AppImage | `SessionsBox-v0.1.0-linux-aarch64-appimage.AppImage` |
| Linux ARM64 DEB | `SessionsBox-v0.1.0-linux-arm64-deb.deb` |
| Linux ARM64 RPM | `SessionsBox-v0.1.0-linux-aarch64-rpm.rpm` |

For example, the Apple silicon link is
`binaries/SessionsBox-v0.1.0-darwin-aarch64-dmg.dmg` relative to `index.html`.
Missing binaries are intentional until the release files are added.

### Release workflow

The release reference matrix builds macOS, Windows, and Linux natively for x86_64 and
aarch64, using `tauri-apps/tauri-action@v1` and this release asset pattern:

```text
Serverbox-v[version]-[platform]-[arch]-[bundle][setup][ext]
```

The website adopts the same pattern with the **SessionsBox** prefix. The exact
platform and per-bundle architecture spellings were checked against the
[Tauri action source](https://github.com/tauri-apps/tauri-action/blob/v1/src/build.ts).
In particular, macOS uses `darwin`; Linux x64 AppImage/DEB use `amd64` while RPM
uses `x86_64`; Linux ARM64 DEB uses `arm64` while AppImage/RPM use `aarch64`.

Sessions Box now uses [`.github/workflows/release.yml`](../.github/workflows/release.yml)
with that six-target matrix and this pattern:

```yaml
releaseAssetNamePattern: "SessionsBox-v[version]-[platform]-[arch]-[bundle][setup][ext]"
```

Push a version tag such as `v0.1.0`. CI/CD runs only on tag pushes.
The tag must match the app manifests and website download links.
The workflow builds the exact tagged commit, creates or resumes a draft release,
and verifies all twelve named installers are uploaded and nonempty. It publishes
the release automatically after all six builds and verification succeed. Failed
builds leave an unpublished draft for diagnosis/retry. Published releases
cannot be overwritten by rerunning the workflow; use a new version instead.
See the [root README](../README.md#github-ci-and-releases) for versioning and CI.

Copy the corresponding GitHub release assets directly into `binaries/`. Website
deployment is separate and is not performed by the release workflow. If
copying raw Tauri output before upload, rename it to the filename above. The
reference workflow uses macOS ad-hoc signing (`APPLE_SIGNING_IDENTITY: '-'`),
which is not a paid developer certificate or notarization. This can avoid Apple
silicon treating an otherwise valid bundle as damaged while still requiring
first-launch approval. macOS app archives are not offered because DMGs cover
the installation flow; updater metadata and signatures are not downloads here.

## Support copy

For help, contact <hello@goodapps.store>.

macOS and Windows installation notes explain unsigned/unnotarized release
prompts and link to official platform guidance. They distinguish the expected
missing-signature/reputation prompts from a claim that a binary has been
independently verified safe.
