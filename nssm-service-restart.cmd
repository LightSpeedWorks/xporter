@pushd %~dp0
@call nssm-set-svc-app-name
net stop %SVC%
git pull
net start %SVC%
@popd
