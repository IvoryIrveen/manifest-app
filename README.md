# Field log (manifest-app)

A Strux real-world test project (docs/REAL_WORLD_TESTS.md in the Strux repository).

**What it is:** a small site generator (`site/build.mjs`, plain Node, no dependencies) that turns the notes in
`site/content/` into HTML pages. Nothing in it is a framework Strux could detect, so `strux.json` at the repository root
tells Strux how to build it.

| Source | `strux.json` | What Strux should do |
|---|---|---|
| `main` | `root: site`, `build: node build.mjs`, `output: public` | Use the manifest (source "manifest"): build and publish the three notes |
| branch `invalid-manifest` | Has an unknown field `framework` | Refuse the manifest ("a setting Strux does not know: `framework`"), never guess; the live App stays live |
| branch `static-manifest` | `root: site`, `output: prebuilt`, no build | Publish the committed `site/prebuilt/` folder as it is, without a build |

A manifest without `build` is a static site: Strux publishes its `output` folder inside `root` as committed (or `root`
itself when there is no `output`).

Test both branches on the App published from `main` (same folder, `site`): in Manage, **Change branch**.

Check locally: `cd site && node build.mjs`, then open `site/public/index.html`.
