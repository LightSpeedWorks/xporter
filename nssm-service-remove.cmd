@pushd %~dp0
@call nssm-set-svc-app-name
%NSSM% remove %SVC% confirm
@popd
@pause
