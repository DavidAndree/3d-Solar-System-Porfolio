3d-Solar-System-Porfolio

## Deployment Checklist (GitHub Pages + Custom Domain)

- Push changes to `main`.
- In GitHub, set `Settings` -> `Pages` -> `Source` to `GitHub Actions`.
- Wait for the `Deploy to GitHub Pages` workflow to finish successfully.
- Confirm `CNAME` is present in `public/CNAME` with `davidalvaradoc.com`.
- Hard refresh the live site after deploy (`Cmd+Shift+R`) to avoid stale cached assets.
