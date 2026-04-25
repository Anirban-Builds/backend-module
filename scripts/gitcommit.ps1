function ship($name, $msg) {
    # 1. Save and Push
    git checkout -b $name
    git add -A
    git commit -m $msg
    git push origin $name

    # 2. Transition to Master
    git checkout master
    git branch -D $name

    Write-Host "🚀 Push successful. Waiting for GitHub Auto-Merge to complete..." -ForegroundColor Cyan

    # 3. The Smart Loop
    $merged = $false
    $attempts = 0
    while (-not $merged) {
        $attempts++
        Write-Host "Checking for remote update (Attempt $attempts)..." -ForegroundColor Gray

        # Fetch the latest status from GitHub
        git fetch origin master --quiet

        # Check if origin/master has moved ahead of our local master
        $localRev = git rev-parse master
        $remoteRev = git rev-parse origin/master

        if ($localRev -ne $remoteRev) {
            # Update detected!
            git pull origin master
            Write-Host "✅ Local master is now synced with GitHub's Auto-Merge!" -ForegroundColor Green
            $merged = $true
        } else {
            # Still stale? Wait 5 seconds and try again
            if ($attempts -gt 20) {
                Write-Host "❌ Timeout: GitHub is taking too long. Please pull manually later." -ForegroundColor Red
                break
            }
            Start-Sleep -s 5
        }
    }
}