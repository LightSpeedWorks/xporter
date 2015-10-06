@pushd %~dp0
@call nssm-set-svc-app-name
net start %SVC%
@popd
@pause
