@pushd %~dp0
@call nssm-set-svc-app-name
net stop %SVC%
net start %SVC%
@popd
